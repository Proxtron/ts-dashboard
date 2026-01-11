import { Button, Dialog, Input, Portal, InputGroup, Separator, List, HStack, Box, useToken, Text } from "@chakra-ui/react";
import { MapPinPen, MapPinPlus, Search, X, Locate, LocateOffIcon } from "lucide-react";
import { useState } from "react";

interface LocationSearchProps {
    action: "edit" | "add",
    getLocation: (latitude: number, longitude: number) => void
}

const LocationSearch = ({action, getLocation} : LocationSearchProps) => {

    const [permissionsDenied, setPermissionsDenied] = useState(false)
    const [accentDefault, errorDefault] = useToken("colors", ["accent.default", "error.default"])

    const handleLocationRequest = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setPermissionsDenied(false);
                getLocation(position.coords.latitude, position.coords.longitude);
            }, () => {
                setPermissionsDenied(true);
            })
        } else {

        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button color="text.primary" bgColor="accent.default">
                    {
                        action === "add" && 
                        <>
                            <MapPinPlus/>
                            Add Location
                        </>
                    }
                    {
                        action === "edit" &&
                        <>
                            <MapPinPen/>
                            Edit Location
                        </>
                    }
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop bgColor="bg.subtle"/>
                <Dialog.Positioner>
                    <Dialog.Content maxW="600px" width="80%" >
                        <Dialog.Header bgColor="bg.surface" display="block" borderRadius={12}>
                            <Dialog.Title mb={4}>Select Location</Dialog.Title>
                            <InputGroup endElement={<Search/>}>
                                <Input borderRadius={9} type="text" width="100%"></Input>
                            </InputGroup>
                            
                        </Dialog.Header>
                        <Separator/>
                        <Dialog.Body px={0}>
                            <List.Root listStyle="none">
                                {
                                    permissionsDenied 
                                    ?
                                    <List.Item py={3} px={6}>
                                            <HStack gap={4}>
                                                <Box p={2} borderRadius={6}>
                                                    <LocateOffIcon color={errorDefault} />
                                                </Box>
                                                    <Text fontWeight={500} fontSize={16} color="error.default" mb={1}>Location Access Denied</Text>
                                            </HStack>                                        
                                    </List.Item>
                                    :
                                    <Button variant="ghost" textAlign="left" py={9} px={6} justifyContent="left" onClick={() => handleLocationRequest()}>
                                        <List.Item>
                                                <HStack gap={4}>
                                                    <Box bgColor="accent.subtle" p={2} borderRadius={6}>
                                                        <Locate color={accentDefault} />
                                                    </Box>
                                                    <Box>
                                                        <Text mb={1}>Use Current Location</Text>
                                                        <Text fontSize={14} color="text.secondary">Allow access to your precise location</Text>
                                                    </Box>
                                                </HStack>                                        
                                        </List.Item>
                                    </Button>
                                }
                                
                                
                            </List.Root>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button>Save</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <Button variant="ghost"><X/></Button>
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
            
        </Dialog.Root>
    );
}

export default LocationSearch