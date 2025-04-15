
import { useParams } from "react-router-dom"
import EditNoteForm from "./EditNoteForm.jsx"

import { useGetNotesQuery } from "./notesApiSlice"
import { useGetUsersQuery } from "../users/usersApiSlice"
import useAuth from "../../hooks/useAuth.js"
import PulseLoader from "react-spinners/PulseLoader.js"
import useTitle from "../../hooks/useTitle.js"


function EditNote() {

    useTitle('notesNote: Edit Note');

    const { id } = useParams();

    const { username, isManager, isAdmin } = useAuth();

    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[id]
        }),
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map((i) => data?.entities[i])
        }),
    });

    if (!note || !users?.length) return <PulseLoader color={"#FFF"}/>

    if (!isManager || !isAdmin) {
        if (note.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    const content = <EditNoteForm note={note} users={users} />;

    return content;
}

export default EditNote;