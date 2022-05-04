import React from 'react';
import "regenerator-runtime/runtime";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";


function App({ domElement }) {

    const [open, setOpen] = React.useState(true);

    const apiUrl = domElement.getAttribute("data-api-url");
    const sourceId = domElement.getAttribute("data-source-id");
    const sessionId = domElement.getAttribute("data-session-id");
    const leftBtnText = domElement.getAttribute("data-left-button-text");
    const rightBtnText = domElement.getAttribute("data-right-button-text");
    const popupTitle = domElement.getAttribute("data-popup-title");
    const content = domElement.getAttribute("data-content");
    const posHorizontal = domElement.getAttribute("data-horizontal-position");
    const posVertical = domElement.getAttribute("data-vertical-position");
    const popupLifetime = parseInt(domElement.getAttribute("data-popup-lifetime"), 10) * 1000;
    const theme = domElement.getAttribute("data-theme");
    const eventType = domElement.getAttribute("data-event-type");
    const saveEvent = domElement.getAttribute("data-save-event");
    const profileId = domElement.getAttribute("data-profile-id");


    const sendEvent = async (answer) => {

        const response = await fetch(`${apiUrl}/track`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "source": {
                    "id": sourceId
                },
                "session": {
                    "id": sessionId
                },
                "profile": {
                    "id": profileId
                },
                "context": {},
                "properties": {},
                "events": [
                    {
                        "type": eventType,
                        "properties": {
                            "answer": answer
                        },
                        "options": {
                            "saveEvent": saveEvent === 'yes'
                        }
                    }
                ],
                "options": {}
            })
        })

        const data = await response.json()
        console.log(data);

        setOpen(false);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            setOpen(false);
        }
        else if (reason === "timeout") {
            setOpen(false);
        }
    };

    return <>
        <style>{`
            .QuestionSnackbar .QuestionSnackbarContent {
                background-color: ${theme === "dark" ? "#343434" : "#ffffff"};
                display: flex;
                flex-direction: row;
                justify-content: center;
            }
            .QuestionSnackbar .QuestionSnackbarContent .QuestionSnackbarContentMessage {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            .QuestionSnackbar .QuestionSnackbarContent .QuestionSnackbarContentMessage .QuestionPopupTitleBox {
                color: ${theme === "dark" ? "#ffffff" : "#343434"};
            }
            .QuestionSnackbar .QuestionSnackbarContent .QuestionSnackbarContentMessage .QuestionPopupTitleBox Typography {
                all: inherit;
            }
            .QuestionSnackbar .QuestionSnackbarContent .QuestionSnackbarContentMessage .QuestionPopupMessageBox {
                color: ${theme === "dark" ? "#ffffff" : "#343434"};
            }
            .QuestionSnackbar .QuestionSnackbarContent .QuestionSnackbarContentMessage .QuestionPopupMessageBox p {
                all: inherit;
                margin: 10px;
            }
            .QuestionSnackbar .QuestionSnackbarContent .QuestionSnackbarContentMessage .QuestionPopupButtonsBox {
                align-self: center;
                margin: 10px;
                display: flex;
                flex-direction: row;
                gap: 20px;
                color: ${theme === "dark" ? "#ffffff" : "#343434"};
            }
            .QuestionSnackbar .QuestionSnackbarContent .QuestionSnackbarContentMessage .QuestionPopupButtonsBox .QuestionPopupButton {
                background-color: rgba(0, 0, 0, 0);
                color: inherit;
                border-color: inherit;
            }
        `}</style>
        <Snackbar
            className="QuestionSnackbar"
            anchorOrigin={{ vertical: posVertical, horizontal: posHorizontal }}
            open={open}
            onClose={handleClose}
            autoHideDuration={popupLifetime}
        >
            <SnackbarContent
                className="QuestionSnackbarContent"
                message={
                    <>
                        <Box className="QuestionSnackbarContentMessage">
                            <Box className="QuestionPopupTitleBox">
                                <Typography variant="h5">{popupTitle}</Typography>
                            </Box>
                            <Box className="QuestionPopupMessageBox">
                                <p>{content}</p>
                            </Box>
                            <Box className="QuestionPopupButtonsBox">
                                <Button className="QuestionPopupButton" variant="outlined" onClick={() => sendEvent(leftBtnText)}>{leftBtnText}</Button>
                                <Button className="QuestionPopupButton" variant="outlined" onClick={() => sendEvent(rightBtnText)}>{rightBtnText}</Button>
                            </Box>
                        </Box>
                    </>
                }
            />
        </Snackbar>
    </>
    ;

}

export default App;
