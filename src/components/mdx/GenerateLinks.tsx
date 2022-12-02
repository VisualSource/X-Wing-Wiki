import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function GenerateLinks(props: { data: { ship: string }[] }) { 
    return (
    props.data.map((value,i)=>(
        <Fragment key={i}>
        <Link replace to={`#${value.ship.toLowerCase().replaceAll(" ","-")}`}>{value.ship}</Link> { i !== (props.data.length-1) ? "| " : null}
        </Fragment>
    ))
)}