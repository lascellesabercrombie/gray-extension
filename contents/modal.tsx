import './player.css'

export function Modal ({handleToggleModal, modalTitleContents, modalParagraphContents}) {
    return (
        <div id="modal">
            <h1>{modalTitleContents}</h1>
            <p>{modalParagraphContents}</p>
            <button onClick={handleToggleModal}>Very well</button>
        </div>
    )
}