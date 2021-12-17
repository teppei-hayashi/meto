import type { NextPage } from 'next';
import Image from 'next/image';
import fetch from 'node-fetch'; // @ts-ignore

const Home: NextPage = ({ data }) => {
  return (
    <div>
      <Image
        src={
          // 'https://raw.githubusercontent.com/SOARIG/ARi-uml/main/%E3%82%AF%E3%83%A9%E3%82%B9%E5%9B%B3/%E3%82%B7%E3%83%AA%E3%82%A2%E3%83%A9%E3%82%A4%E3%82%B6%E3%83%BC%E3%82%AF%E3%83%A9%E3%82%B9%E5%9B%B3.png?token=ATSGL4BONKBIBELLP4MPBADBXSAGO'
          'https://images.metmuseum.org/CRDImages/ad/web-large/127219.jpg'
        }
        alt={'お試し'}
        width={400}
        height={280}
      />
      {/* {data.map((object: any) => (
        <div key={object.objectID}>
          <Image
            src={object.primaryImageSmall}
            alt={object.objectName}
            layout='fill'
            objectFit='contain'
          />
        </div>
      ))} */}
      {/* {typeof data.objectID} */}
    </div>
  );
};

// データ個数制限
export async function getStaticProps() {
  const objects: any = await fetch(
    'https://collectionapi.metmuseum.org/public/collection/v1/objects',
    {
      insecureHTTPParser: true,
    },
  ).then((res) => res.json());
  const objectIDs = objects.objectIDs.slice(0, 100);
  console.log('objectIDs', objectIDs);
  const data = await Promise.all(
    objectIDs.map(async (objectID: any) => {
      return await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
        {
          insecureHTTPParser: true,
        },
      ).then((res) => res.json());
    }),
  );

  // console.info(data);
  return {
    props: {
      data: data.filter((object) => object.isPublicDomain),
    },
  };
}

export default Home;
