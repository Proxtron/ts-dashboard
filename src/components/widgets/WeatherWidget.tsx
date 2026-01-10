import type { Location, WeatherWidget } from "@/types/Widget";
import { Card, Text, Heading, HStack, Box, useToken, VStack, Button, Separator} from "@chakra-ui/react";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities/useSyntheticListeners";
import type { WeatherState } from "@/types/Widget";
import { getWeatherDescription, getWeatherIcon } from "@/lib/get";
import { Wind, Droplet, Eye, MapPinPlus, Grip, MapPinOff, MapPinPen, type LucideIcon } from "lucide-react";

interface WeatherWidgetProps {
    widgetId: string,
    setActivatorNodeRef: (element: HTMLElement | null) => void,
    listeners: SyntheticListenerMap | undefined
}


const WeatherWidget = ({ widgetId, setActivatorNodeRef, listeners }: WeatherWidgetProps) => {

    const weatherNow : WeatherState = {
        temperature: 75,
        weatherCode: 0,
        windSpeed: 5,
        humidityPercentage: 65,
        visiblity: 20
    }

    const location : Location = {
        city: "San Francisco",
        state: "California",
        country: "USA"
    }

    let WeatherIcon : LucideIcon = getWeatherIcon(0);
    let weatherDescription: string | undefined;
    if(weatherNow) {
        WeatherIcon = getWeatherIcon(weatherNow.weatherCode);
        weatherDescription = getWeatherDescription(weatherNow.weatherCode);
    }
    
    const [accentDefault, textSecondary, borderDefault] = useToken("colors", ["accent.default", "text.secondary", "border.default"])

    return (
        <Card.Root w="380px" minH="420px" position="relative">
            {!weatherNow 
            ? 
            <VStack justifyContent="center" my="auto">
                <Box bgColor="bg.subtle" display="inline-block" p={6} borderRadius="100%" mb={6}>
                    <MapPinOff color={textSecondary} size={48}/>
                </Box>
                
                <Heading>No Location Selected</Heading>
                <Text fontSize={14} color="text.secondary" mb={6}>Search for a city to see weather details</Text>
                <Button color="text.primary" bgColor="accent.default">
                    <MapPinPlus/>
                    Add Location
                </Button>

            </VStack>
            :
            <>
                <Card.Header gapY={0} mb={6}>
                    <Heading as="h2">{location.city}</Heading>
                    <Text fontSize="14px" color="text.secondary">{location.state}, {location.country}</Text>
                </Card.Header>

                <Card.Body py={0} mb={3}>
                    <HStack justifyContent="space-between" mb={6}>
                        <Box>
                            <Text lineHeight={1.15} fontSize={56} fontWeight={500}>{weatherNow.temperature}&deg;</Text>
                            <Text color="accent.default">{weatherDescription}</Text>
                        </Box>
                        <Box>
                            <WeatherIcon color={accentDefault} size="64px"/>
                        </Box>
                    </HStack>
                    <HStack justifyContent="space-around" mb={3} gapX={3}>
                        <VStack py={3} borderRadius={6} bgColor="bg.subtle" flex="1 1 0" border={`1px solid ${borderDefault}`}>
                            <Wind  color={textSecondary}/>
                            <Text fontSize="14px" color="text.secondary">Wind</Text>
                            <Text>{weatherNow.windSpeed} mph</Text>
                        </VStack>
                        <VStack py={3} borderRadius={6} bgColor="bg.subtle" flex="1 1 0" border={`1px solid ${borderDefault}`}>
                            <Droplet  color={textSecondary}/>
                            <Text fontSize="14px" color="text.secondary">Humidity</Text>
                            <Text>{weatherNow.humidityPercentage}%</Text>
                        </VStack>
                        <VStack py={3} borderRadius={6} bgColor="bg.subtle" flex="1 1 0" border={`1px solid ${borderDefault}`}>
                            <Eye  color={textSecondary}/>
                            <Text fontSize="14px" color="text.secondary">Visiblity</Text>
                            <Text>{weatherNow.visiblity} mi</Text>
                        </VStack>
                    </HStack>
                </Card.Body>

                <Separator mb={6}/>
                
                <Card.Footer justifyContent="space-between">
                    <Button color="text.primary" bgColor="accent.default">
                        <MapPinPen/>
                        Edit Location
                    </Button>
                </Card.Footer>
            </>
            }
            <Button ref={setActivatorNodeRef} {...listeners} variant="ghost" position="absolute" right={3} bottom={6}>
                <Grip color={accentDefault}/>
            </Button>
        </Card.Root>
    );
}

export default WeatherWidget;