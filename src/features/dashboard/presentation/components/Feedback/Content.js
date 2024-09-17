import React, {useState} from "react";
import {Button, Icon, Collapse, Box, Textarea, VStack, Select, useColorMode} from "@chakra-ui/react";
import {IoMdChatboxes} from "react-icons/io";

export default function FixedPlugin(props) {
    const {...rest} = props;
    let bgButton = "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)";
    const {colorMode} = useColorMode();
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({});
    const {comment, feedback_type_id} = formData;
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const toggleForm = () => setIsOpen(!isOpen);

    const handleFeedbackSubmit = () => {
        console.log("Feedback submitted:");
        setIsOpen(false);
    };

    return (
        <>
            <Button
                {...rest}
                h='60px'
                w='60px'
                zIndex='99'
                bg={bgButton}
                position='fixed'
                variant='no-effects'
                right='35px'
                bottom='30px'
                border='1px solid'
                borderColor='#6A53FF'
                borderRadius='50px'
                onClick={toggleForm}
                display='flex'
                p='0px'
                align='center'
                justify='center'>
                <Icon
                    h='24px'
                    w='24px'
                    color='white'
                    as={IoMdChatboxes}
                />
            </Button>

            {/* Collapse Form */}
            <Collapse in={isOpen} animateOpacity>
                <Box
                    p={4}
                    mt="-10px"
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow="md"
                    position="fixed"
                    bottom="100px"
                    right='35px'
                    bg={colorMode === 'light' ? 'white' : 'navy.900'}
                    zIndex="100"
                    w={["90%", "80%", "300px"]}
                    maxW="400px"
                >
                    <VStack spacing={3}>
                        <Select
                            name='feedback_type_id'
                            value={feedback_type_id}
                            placeholder="Please Select"
                            onChange={handleChange}
                            fontSize='sm'
                            variant='auth'
                            size='lg'
                            width={'100%'}>
                            <option value="bug">Report a Bug</option>
                            <option value="feature">Feature Request</option>
                            <option value="other">Other</option>
                        </Select>

                        <Textarea
                            height='200px'
                            placeholder="Your Comment"
                            value={comment}
                            onChange={handleChange}
                            size="sm"
                            resize="none"
                        />

                        <Button
                            type='button'
                            fontSize='sm'
                            variant='brand'
                            fontWeight='500'
                            onClick={handleFeedbackSubmit}
                            w="100%">Submit Feedback</Button>
                    </VStack>
                </Box>
            </Collapse>
        </>
    );
}
