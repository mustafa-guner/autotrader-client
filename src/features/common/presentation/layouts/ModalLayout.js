import {Box, Modal, useStyleConfig} from "@chakra-ui/react";

function ModalLayout(props) {
    const {variant, children, ...rest} = props;
    const styles = useStyleConfig("Modal", {variant});

    return (
        <Modal __css={styles} {...rest}>
            {children}
        </Modal>
    );
}

export default ModalLayout;
