import React, {useEffect} from "react";
import {Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import NewsService from "../services/news.service";
import {Loading} from "./Loading";
import UserService from "../services/user.service";

const Profile = () => {
    const {user: currentUser} = useSelector((state) => state.auth);
    const [loading, setLoading] = React.useState(0);
    const [sources, setSources] = React.useState([]);
    const [categories, setCategories] = React.useState([]);

    const [selectedSources, setSelectedSources] = React.useState([]);
    const [selectedCategories, setSelectedCategories] = React.useState([]);
    const [selectedAuthors, setSelectedAuthors] = React.useState([]);

    useEffect(() => {
        setLoading(1);
        NewsService.getSources().then(
            (response) => {
                setSources(response.data);
                setLoading(0);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                setLoading(0);
            }
        );
        NewsService.getCategories().then(
            (response) => {
                setCategories(response.data);
                setLoading(0);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                setLoading(0);
            }
        );

        if (currentUser) {
            UserService.getUserSettings().then(
                (response) => {
                    const sources = response.data.userSourceSettings.map(source => source.source.name);
                    setSelectedSources(sources);
                    const categories = response.data.userCategorySettings.map(category => category.category_id);
                    setSelectedCategories(categories);
                    const authors = response.data.userAuthorSettings.map(author => author.author_id);
                    setSelectedAuthors(authors);

                    console.log(sources, categories, authors);
                    setLoading(0);
                },
                (error) => {
                    const _content =
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString();
                    setLoading(0);
                }
            );
        }

    }, []);

    const sourceSelected = (event) => {
        const source = event.target.value;
        console.log(source);
        let selectedArr = [...selectedSources];
        if (selectedArr.includes(source)) {
            selectedArr = selectedArr.filter(item => item !== source)
        } else {
            selectedArr.push(source);
        }
        setSelectedSources(selectedArr);
    }
    const categorySelected = (event) => {
        let category = event.target.value;
        category = parseInt(category)
        console.log(category);
        let selectedArr = [...selectedCategories];
        if (selectedArr.includes(category)) {
            selectedArr = selectedArr.filter(item => item !== category)
        } else {
            selectedArr.push(category);
        }

        console.log(selectedArr);
        setSelectedCategories(selectedArr);
    }
    const authorSelected = (event) => {
        let author = event.target.value;
        author = parseInt(author)
        console.log(author);
        let selectedArr = [...selectedAuthors];
        if (selectedArr.includes(author)) {
            selectedArr = selectedArr.filter(item => item !== author)
        } else {
            selectedArr.push(author);
        }

        console.log(selectedArr);
        setSelectedAuthors(selectedArr);
    }


    const saveSettings = () => {
        setLoading(1);
        UserService.saveSettings(
            selectedSources,
            selectedCategories,
            selectedAuthors
        ).then(
            (response) => {
                setLoading(0);
                alert("Settings saved successfully");
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                setLoading(0);
            }
        );
    }

    if (!currentUser) {
        return <Navigate to="/login"/>;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>User Settings:</strong><br/>
            <button className={"btn btn-dark mt-1"} type={"button"} onClick={saveSettings}>Save settings</button>
            {loading ? (<Loading/>) : (
                <div className={"card"}>
                    <div className={"card-body"}>
                        <div className={"row"}>
                            <div className={"col-md-4 col-sm-12"}>
                                <h5>Sources*</h5>
                                <small className={"text-muted"}>*Not filtered if any value not selected</small>
                                {sources && sources.map((source, index) => (
                                    <div className="form-check" key={'source.' + index}>
                                        <input className="form-check-input" type="checkbox" value={source.name}
                                               id={'source.' + index}
                                               onChange={sourceSelected}
                                               checked={selectedSources.includes(source.name)}
                                               required/>
                                        <label className="form-check-label" htmlFor={'source.' + index}>
                                            {source.title}
                                        </label>
                                        <div className="invalid-feedback">
                                            You must agree before submitting.
                                        </div>
                                    </div>))}
                            </div>
                            <div className={"col-md-4 col-sm-12"}>
                                <h5>Categories*</h5>
                                <small className={"text-muted"}>*Not filtered if any value not selected</small>
                                {categories && categories.map((category, index) => (
                                    <div className="form-check" key={'category.' + category.id}>
                                        <input className="form-check-input" type="checkbox" value={category.id}
                                               id={'category.' + category.id}
                                               onChange={categorySelected}
                                               checked={selectedCategories.includes(category.id)}
                                               required/>
                                        <label className="form-check-label" htmlFor={'category.' + category.id}>
                                            {category.title}
                                        </label>
                                        <div className="invalid-feedback">
                                            You must agree before submitting.
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={"col-md-4 col-sm-12"}>
                                <h5>Authors*</h5>
                                <small className={"text-muted"}>*Not filtered if any author not selected</small>
                                {sources && sources.map((source, sourceIndex) => (
                                    <div key={source.name}>
                                        <h6 className={"text-muted"}>{source.title}</h6>
                                        {selectedSources.includes(source.name) && source.authors.map((author, index) => (
                                            <div className="form-check" key={sourceIndex + '.' + author.id}>
                                                <input className="form-check-input" type="checkbox" value={author.id}
                                                       id={sourceIndex + '.' + author.id}
                                                       onChange={authorSelected}
                                                       checked={selectedAuthors.includes(author.id)}
                                                       required/>
                                                <label className="form-check-label"
                                                       htmlFor={sourceIndex + '.' + author.id}>
                                                    {author.title}
                                                </label>
                                                <div className="invalid-feedback">
                                                    You must agree before submitting.
                                                </div>
                                            </div>))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Profile;
