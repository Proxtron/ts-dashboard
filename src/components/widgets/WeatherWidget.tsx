import type { Location, WeatherWidget } from "@/types/Widget";
import { Card, Text, Heading, HStack, Box, useToken, VStack, Button, Separator } from "@chakra-ui/react";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities/useSyntheticListeners";
import type { WeatherState } from "@/types/Widget";
import { getWeatherDescription, getWeatherIcon, getWidget } from "@/lib/get";
import { Wind, Droplet, Eye, Grip, MapPinOff, type LucideIcon } from "lucide-react";
import LocationSearch from "../ui/LocationSearch";
import { AppContext } from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";
import { apiClient } from "@/lib/fetch";
import SpinnerOverlayManager from "../ui/SpinnerOverlay";
import { toaster } from "../ui/toaster";

interface WeatherWidgetProps {
    widgetId: string,
    setActivatorNodeRef: (element: HTMLElement | null) => void,
    listeners: SyntheticListenerMap | undefined
}

interface WeatherResponse {
    current: {
        temperature_2m: number,
        weather_code: number,
        wind_speed_10m: number,
        relative_humidity_2m: number,
        time: string
    }
    hourly: {
        visibility: number[]
    }
}

const WeatherWidget = ({ widgetId, setActivatorNodeRef, listeners }: WeatherWidgetProps) => {
    const [location, setLocation] = useState<Location>();
    const [weatherNow, setWeatherNow] = useState<WeatherState>();

    useEffect(() => {
        if (location) {
            SpinnerOverlayManager.open("forecast-request", {})
            apiClient<WeatherResponse>(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=visibility&current=weather_code,temperature_2m,wind_speed_10m,relative_humidity_2m&forecast_days=1&wind_speed_unit=mph&temperature_unit=fahrenheit&timezone=auto`)
                .then((result) => {
                    console.log(result);
                    const currentHour = new Date(result.current.time).getHours();
                    result.hourly.visibility[currentHour];
                    setWeatherNow({
                        temperature: Math.round(result.current.temperature_2m),
                        weatherCode: result.current.weather_code,
                        windSpeed: Math.round(result.current.wind_speed_10m),
                        humidityPercentage: result.current.relative_humidity_2m,
                        visiblity: Math.round(result.hourly.visibility[currentHour] / 1609)
                    })
                })
                .catch((error) => {
                    console.error(error);
                    toaster.create({
                        title: "An error occured with the weather service"
                    })
                })
                .finally(() => {
                    SpinnerOverlayManager.close("forecast-request")
                })
        }
    }, [location])

    // const appContext = useContext(AppContext);
    // if(!appContext) {
    //     return;
    // }
    // const {widgets} = appContext

    // const widget = getWidget(widgets, widgetId);
    // if(widget.type !== "weather") return;

    let WeatherIcon: LucideIcon = getWeatherIcon(0);
    let weatherDescription: string | undefined;
    if (weatherNow) {
        WeatherIcon = getWeatherIcon(weatherNow.weatherCode);
        weatherDescription = getWeatherDescription(weatherNow.weatherCode);
    }

    const [accentDefault, textSecondary, borderDefault] = useToken("colors", ["accent.default", "text.secondary", "border.default"])

    return (
        <Card.Root w="380px" minH="420px" position="relative">
            {!location || !weatherNow
                ?
                <VStack justifyContent="center" my="auto">
                    <Box bgColor="bg.subtle" display="inline-block" p={6} borderRadius="100%" mb={6}>
                        <MapPinOff color={textSecondary} size={48} />
                    </Box>

                    <Heading>No Location Selected</Heading>
                    <Text fontSize={14} color="text.secondary" mb={6}>Search for a city to see weather details</Text>
                    <LocationSearch action="add" setLocation={setLocation} />

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
                                <WeatherIcon color={accentDefault} size="64px" />
                            </Box>
                        </HStack>
                        <HStack justifyContent="space-around" mb={3} gapX={3}>
                            <VStack py={3} borderRadius={6} bgColor="bg.subtle" flex="1 1 0" border={`1px solid ${borderDefault}`}>
                                <Wind color={textSecondary} />
                                <Text fontSize="14px" color="text.secondary">Wind</Text>
                                <Text>{weatherNow.windSpeed} mph</Text>
                            </VStack>
                            <VStack py={3} borderRadius={6} bgColor="bg.subtle" flex="1 1 0" border={`1px solid ${borderDefault}`}>
                                <Droplet color={textSecondary} />
                                <Text fontSize="14px" color="text.secondary">Humidity</Text>
                                <Text>{weatherNow.humidityPercentage}%</Text>
                            </VStack>
                            <VStack py={3} borderRadius={6} bgColor="bg.subtle" flex="1 1 0" border={`1px solid ${borderDefault}`}>
                                <Eye color={textSecondary} />
                                <Text fontSize="14px" color="text.secondary">Visiblity</Text>
                                <Text>{weatherNow.visiblity} mi</Text>
                            </VStack>
                        </HStack>
                    </Card.Body>

                    <Separator mb={6} />

                    <Card.Footer justifyContent="space-between">
                        <LocationSearch action="edit" setLocation={setLocation} />
                    </Card.Footer>
                </>
            }
            <Button ref={setActivatorNodeRef} {...listeners} variant="ghost" position="absolute" right={3} bottom={6}>
                <Grip color={accentDefault} />
            </Button>
        </Card.Root>
    );
}

export default WeatherWidget;