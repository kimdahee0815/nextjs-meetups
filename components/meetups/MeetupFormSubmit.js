import { useFormStatus } from "react-dom";

export default function MeetupFormSubmit() {
    const { pending } = useFormStatus();

    return <button disable={pending}>{pending ? "Submitting...." : "Add Meetup"}</button>;
}
