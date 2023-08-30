import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router"
import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import { Fragment } from "react";
import Button from "@/components/ui/button";
import ErrorAlert from '../../components/ui/error-alert'


export default function FilteredEventsPage()
{
    const router = useRouter();
    
    const filteredData:any = router.query.slug;
    if(!router.isReady)
    {
        return <Fragment>
        <div className="center">
            <p>Loading...</p>
            <Button link='/events'>Show all Events</Button>
        </div>
        </Fragment>
    }
        const  filteredYear = filteredData[0];
        const  filteredMonth = filteredData[1];
        
        const numYear = +filteredYear;
        const numMonth = +filteredMonth;
        
    console.log(router.pathname)

        if(
            isNaN(numYear) || 
            isNaN(numMonth) ||
            numYear > 2030 ||
            numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12)
        {
            return <p>Invalid filter.</p>
        }
        
        const filteredEvents = getFilteredEvents({year: numYear, month:numMonth})
        
        if(!filteredEvents || filteredEvents.length === 0)
        {
            return <Fragment>
                <ErrorAlert>
                    <p>No Events found.</p>
                </ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show all Events</Button>
                </div>
                </Fragment>
        }
        
        const date = new Date(numYear,numMonth -1);

        return (
            <Fragment>
                <ResultsTitle date= {date}/>
            <EventList items={filteredEvents}/>
        </Fragment>
    )
}