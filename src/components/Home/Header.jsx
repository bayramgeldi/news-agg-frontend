import * as PropTypes from "prop-types";
import {relative,humanizeDate} from "../../Utils/format";

function Image(props) {
    return (
        <div style={{height: 120, width: 120, overflow: 'hidden', borderRadius: 8}}>
            <img src={props.item.urlToImage} className="image rounded" alt={props.item.title}/>
        </div>)

}

Image.propTypes = {item: PropTypes.any};
export const Header = ({top5}) => {
    const main = top5[0];
    const rest = top5.slice(1, 5);

    return (
        <div className={"row jumbotron mt-5"}>
            <div className="col-md-8">
                <div style={{
                    backgroundImage: `url(${main?.urlToImage})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    height: "100%",
                    borderRadius: 8
                }}>
                    <div className="card main-card" style={{width:405}}>
                        <div className="card-header border-0">
                            <div className={"source"}>{main?.subSource.name}<small className="align-middle">&bull;{relative(main?.publishedAt)}</small></div>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title">{main?.title}</h1>
                            <p className="card-text">{main?.description}</p>
                            <a href={main?.url} className="link-dark link-underline-opacity-0 align-bottom" target={"_blank"}>Read More</a>
                        </div>
                        <div className="card-footer border-0">
                            <p>{humanizeDate(main?.publishedAt)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                {rest.map((item, index) => (
                    <div key={index} className="card mt-3" style={{maxHeight: "120px"}}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <Image item={item}/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h6 className="card-title">{item.title}</h6>
                                    <p className="card-text">
                                        <small className={"red"}>{item.category.title}</small>
                                        <small className="text-muted m-1">{relative(item.publishedAt)}</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>))}
            </div>
        </div>
    )
}
