import { Flex, IconButton, useToast } from "@chakra-ui/react";

interface FakeControlProps {}
const FakeControl: React.FC<FakeControlProps> = () => {
    const toast = useToast();
    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        //Do something fun here
        toast({
            title: "Just kidding! please use window close button instead!",
            position: "top",
            status: "success",
        });
    };
    return (
        <Flex h="46px" w="full" mx="-4" px="4" align="center" justify="center">
            <Flex>
                <IconButton
                    aria-label="control-close"
                    variant="solid"
                    colorScheme="red"
                    size="macos"
                    onClick={handleClose}
                />
                <IconButton
                    aria-label="control-minimize"
                    variant="solid"
                    colorScheme="yellow"
                    size="macos"
                    mx="8px"
                    onClick={handleClose}
                />
                <IconButton
                    aria-label="control-restore"
                    variant="solid"
                    colorScheme="whatsapp"
                    size="macos"
                    onClick={handleClose}
                />
            </Flex>
            <Flex flex="1">
                <span></span>
            </Flex>
        </Flex>
    );
};

export default FakeControl;
