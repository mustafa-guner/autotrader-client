import React, {useEffect, useState} from "react";
import {Button, Icon, Collapse, Box, Textarea, VStack, Select, useColorMode, Text} from "@chakra-ui/react";
import {IoMdChatboxes} from "react-icons/io";
import {FeedbackService} from "../../../data/feedback_service";
import {useToast} from '@chakra-ui/react';

export default function Content(props) {
    const {...rest} = props;
    let bgButton = "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)";
    const {colorMode} = useColorMode();
    const [isOpen, setIsOpen] = useState(false);
    const toast = useToast();

    // Initialize formData with default values
    const [formData, setFormData] = useState({comment: '', feedback_type_id: ''});
    const {comment, feedback_type_id} = formData;

    const [feedbackTypes, setFeedbackTypes] = useState([]);

    useEffect(() => {
        FeedbackService.fetchFeedbackTypes()
            .then(response => {
                setFeedbackTypes(response.data.data);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const isFormEmpty = () => {
        return comment === '' || feedback_type_id === '';
    };
    const toggleForm = () => setIsOpen(!isOpen);

    const handleFeedbackSubmit = async () => {
        try {
            const response = await FeedbackService.submitFeedback(formData);
            toast({
                position: 'bottom-left',
                title: 'Success',
                description: response.data.message,
                status: 'success',
            })
            setFormData({comment: '', feedback_type_id: ''}); // Reset form data
            setIsOpen(false); // Close form on successful submission
        } catch (error) {
            toast({
                position: 'bottom-left',
                title: 'Error',
                description: error.response.data.message,
                status: 'error',
            })
        }
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
                            {feedbackTypes.map(feedbackType => (
                                <option key={feedbackType.id} value={feedbackType.id}>
                                    {feedbackType.name}
                                </option>
                            ))}
                        </Select>

                        <Textarea
                            name='comment'
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
                            isDisabled={isFormEmpty()}
                            onClick={handleFeedbackSubmit}
                            w="100%">
                            Submit Feedback
                        </Button>
                    </VStack>
                </Box>
            </Collapse>
        </>
    );
}
