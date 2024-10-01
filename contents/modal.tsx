import './player.css'

export function Modal ({handleToggleModal, isModalButtonVisible, modalTitleContents, modalParagraphContents}) {
    return (
        <div id="modal">
            <h1>{modalTitleContents}</h1>
            <p>{modalParagraphContents}</p>
            {isModalButtonVisible && <button className="speech-bubble-button" onClick={handleToggleModal}>Understood</button>}
        </div>
    )
}