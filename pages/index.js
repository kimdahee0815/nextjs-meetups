import { useEffect, useState } from "react";
import Head from "next/head";
import MeetupList from "./../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

// const DUMMY_MEETUPS = [
//     {
//         id: "m1",
//         title: "A First Meetup",
//         image: "https://media.cntraveler.com/photos/5e74f9de2e6ca30009d1d4fa/16:9/w_2560%2Cc_limit/Argentina-GettyImages-1146497849.jpg",
//         address: "Some address 5, 12345 Some City",
//         description: "This is a first meetup!",
//     },
//     {
//         id: "m2",
//         title: "A Second Meetup",
//         image: "https://res.cloudinary.com/gwatco/image/upload/dpr_auto/t_image-card/f_auto/v1722495600/new-website/static/homepage/global-travel-cover/banner.webp",
//         address: "Some address 5, 12345 Some City",
//         description: "This is a second meetup!",
//     },
//     {
//         id: "m3",
//         title: "A Third Meetup",
//         image: "https://cdn.pixabay.com/photo/2016/10/18/08/13/travel-1749508_640.jpg",
//         address: "Some address 5, 12345 Some City",
//         description: "This is a Third meetup!",
//     },
// ];

function HomePage(props) {
    // const [loadedMeetups, setLoadedMeetups] = useState([]);
    // useEffect(() => {
    //     //send a http request and fetch data
    //     setLoadedMeetups(DUMMY_MEETUPS);
    // }, []);
    return (
        <>
            <Head>
                <title>REACT Meetups</title>
                <meta name="description" content="Browse a huge list of highly active React Meetups!"></meta>
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
}

// every request data changes
export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;

    //fetch data from an API
    const client = await MongoClient.connect(
        "mongodb+srv://diana:eLAKLXzptWhP2oxF@udemy-next-project.ibarc.mongodb.net/meetups?retryWrites=true&w=majority&appName=udemy-next-project"
    );

    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },
    };
}

// run build process
// export async function getStaticProps() {

//     // fetch data from an API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS,
//         },
//         //data change
//         revalidate: 1,
//     };
// }

export default HomePage;
