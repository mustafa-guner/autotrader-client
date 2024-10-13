import { mode } from "@chakra-ui/theme-tools";
const Modal = {
    baseStyle: (props) => ({
        p: "20px",
        position: "relative",
        borderRadius: "20px",
        minWidth: "0px",
        wordWrap: "break-word",
        dialog: {
            borderRadius: 'md',
            bg: mode('white', 'navy.800')(props),
        },
        backgroundClip: "border-box",
    }),
};

export const ModalComponent = {
    components: {
        Modal
    },
};


