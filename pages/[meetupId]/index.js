import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

function MeetupDetailPage(props) {
    console.log(props);
    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description}></meta>
            </Head>
            <MeetupDetail {...props.meetupData} />
        </>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(
        "mongodb+srv://diana:eLAKLXzptWhP2oxF@udemy-next-project.ibarc.mongodb.net/meetups?retryWrites=true&w=majority&appName=udemy-next-project"
    );

    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();
    return {
        // I defined all the paths below.
        // if i didn't define all the paths, you set fallback to true (return empty page first immediately and pregenerated) or blocking (finished page is ready and then shown)
        fallback: "blocking",
        paths: meetups.map((meetup) => ({ params: { meetupId: meetup._id.toString() } })),
        // paths: [
        //     {
        //         params: {
        //             meetupId: "m1",
        //         },
        //     },
        //     {
        //         params: {
        //             meetupId: "m2",
        //         },
        //     },
        //     {
        //         params: {
        //             meetupId: "m3",
        //         },
        //     },
        // ],
    };
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(
        "mongodb+srv://diana:eLAKLXzptWhP2oxF@udemy-next-project.ibarc.mongodb.net/meetups?retryWrites=true&w=majority&appName=udemy-next-project"
    );

    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });
    console.log(selectedMeetup);
    client.close();

    console.log(meetupId);
    //fetch data for a single meetup
    return {
        props: {
            meetupData: {
                ...selectedMeetup,
                _id: selectedMeetup._id.toString(),
            },
        },
    };
}

export default MeetupDetailPage;
