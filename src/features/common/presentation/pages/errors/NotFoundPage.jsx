import {useNavigate} from "react-router-dom";
import {Button} from "@chakra-ui/react";

function NotFoundPage() {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); //means go back to previous page stack
    }

    return (
        <div>
            <center>
                <h1>
                    404-Not Found
                </h1>
                <Button onClick={handleGoBack}>
                    Go Back
                </Button>
            </center>
        </div>
    )
}

export default NotFoundPage;