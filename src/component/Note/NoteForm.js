import React from "react";
const NoteForm =(props) =>{
    const {formTitle,title, content, titlechanged, contentChanged ,submitText, submitClicked} = props;
    return(
        <div> 
            <h2>{formTitle}</h2> 
            <div>
                <input
                type='text'
                name='title'
                className="form-input mb-30"
                placeholder="title"
                value={title}
                onChange={titlechanged}
                />
                <textarea
                rows = '10'
                name='content'
                className="form-input"
                placeholder="content"
                value={content}
                onChange={contentChanged}
                />
                <a  href="#" className="button" onClick={submitClicked}>
                {submitText}
                </a>
            </div>
        </div>
    )
}
export default NoteForm;
