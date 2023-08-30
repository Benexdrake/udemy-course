import { Fragment } from "react";
import { useRouter } from "next/router";

import { getAllEvents } from "@/dummy-data"
import EventList from "@/components/events/event-list";
import EventSearch from "@/components/events/event-search";

export default function AllEventsPage()
{
    const events = getAllEvents();
    const router = useRouter();

    function findEventsHandler(year:any,month:any)
    {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    }

    console.log('Hello')

    return (
        <Fragment>
            <EventSearch onSearch={findEventsHandler}/>
            <EventList items={events}/>
        </Fragment>
    )
}