import { useState, useEffect } from "react"
import { useAddNewNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-solid-svg-icons"

function NewNoteForm({users}) {

    const [addNewNote, { isLoading, isSuccess, isError, error }] = useAddNewNoteMutation();

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [userId, setUserId] = useState(users[0].id);

    useEffect(() => {
        if (isSuccess) {
            setTitle('');
            setText('');
            setUserId('');
            navigate('/dash/notes');
        }
    }, [isSuccess, navigate]);

    const onTitleChange = (e) => setTitle(e.target.value);
    const onTextChange = (e) => setText(e.target.value);
    const onUserIdChange = (e) => setUserId(e.target.value);

    const canSave = [title, text, userId].every(Boolean) && !isLoading;

    const onSaveNoteClick = async (e) => {
        e.preventDefault();
        if (canSave) {
            await addNewNote({ title, text, user: userId });
        }
    };

    const options = users.map((user) => {
        return <option key={user.id} value={user.id}> {user.username} </option>
    });

    const errClass = isError ? "errmsg" : "offscreen";
    const validTitleClass = !title ? "form__input--incomplete" : "";
    const validTextClass = !text ? "form__input--incomplete" : "";

    return(
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveNoteClick}>
                <div className="form__title-row">
                    <h2>New Note</h2>
                    <div className="form__action-buttons">
                        <button className="icon-button" title="Save" onClick={onSaveNoteClick} disabled={!canSave}>
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>

                <label className="form__label" htmlFor="title">
                    Title: 
                </label>
                <input className={`form__input ${validTitleClass}`} id="title" name="title" 
                    type="text" autoComplete="off" value={title} onChange={onTitleChange} />
                
                <label className="form__label" htmlFor="text">
                    Text: 
                </label>
                <textarea className={`form__input ${validTextClass}`} id="text" name="text" 
                    value={text} onChange={onTextChange} />

                <label className="form__label form__checkbox-container" htmlFor="username">
                    ASSIGNED TO: 
                </label>
                <select id="username" name="username" value={userId} onChange={onUserIdChange}> 
                    {options}
                </select>
            </form>
        </>
    );
}

export default NewNoteForm;