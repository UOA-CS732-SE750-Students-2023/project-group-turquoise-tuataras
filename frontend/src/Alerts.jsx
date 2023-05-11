import Alert from 'react-bootstrap/Alert';

function Alerts({ showAlert, setShowAlert, alertMessage, alertVariant }) {
    return (
        <Alert show ={showAlert} variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
        {alertMessage}
        </Alert>
    )
}

export default Alerts;

