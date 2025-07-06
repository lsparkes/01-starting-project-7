import { useRef } from 'react';
import Input from './Input.jsx';
import Modal from './Modal.jsx';

export default function NewProject({ onAdd, onCancel }) {
    const modalRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const dueDateRef = useRef();

    function handleSave() {
        const enteredTitle = titleRef.current.value;
        const enteredDescription = descriptionRef.current.value;
        const enteredDueDate = dueDateRef.current.value;

        if (enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDueDate.trim() === '') {
            modalRef.current.open();
            return;
        }

        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate,
        });
    }


       // This is where you would handle form submission, e.g., sending data to an API
    return (
        <>
            <Modal ref={modalRef} buttonCaption="Okay">
                <h2 className="text-xl font-bold text-stone-700 my-4">Oops! An Error has occured!</h2>
                <p className="text-stone-600 mb-4">Please fill in all fields</p>
             </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li><button 
                        className="text-stone-800 hover:text-stone-950"
                        onClick={onCancel}>
                        Cancel
                        </button>
                    </li>
                    <li>
                        <button 
                            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:text-stone-950"
                            onClick={handleSave}>
                            Save
                        </button>
                    </li>
                </menu>
                <div>
                    <Input label="Title" ref={titleRef} />
                    <Input label="Description" textarea ref={descriptionRef} />
                    <Input label="due Date" type="date" ref={dueDateRef} />
                </div>
            </div>
        </>
    )
}