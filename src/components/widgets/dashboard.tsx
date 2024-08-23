'use client'

import { useEffect, useState } from "react";
import { z } from "zod";
import { onboardingSchema } from "./onboarding";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useLocalStorage } from "usehooks-ts";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { DatePickerWithRange } from "../ui/date-picker-range";
import { ChevronDown } from "lucide-react";

const bedInfoSchema = z.object({
    clientName: z.string(),
    clientCIN: z.string(),
    clientPhone: z.string(),
    bedOccupationDuration: z.string(),
    from: z.date(),
    to: z.date(),
})

function Dashboard() {
    const [isMounted, setIsMounted] = useState(false);
    const [localStorage] = useLocalStorage<{
        name: string;
        floors: {
            id: number;
            rooms: {
                id: number;
                beds: {
                    id: string;
                    occupied: boolean;
                }[];
            }[];
        }[];
    }>('onboarding', {
        name: '',
        floors: [],
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
            {localStorage.floors.map((_, index) => {
                return (
                    <Card className="flex flex-col gap-4" key={_.id}>
                        <CardContent>
                            <CardHeader>
                                <CardTitle>Étage {_.id}</CardTitle>
                            </CardHeader>
                            {localStorage.floors[index].rooms.map((_, roomIndex) => {
                                return (
                                    <Room key={_.id} floorIndex={index} roomIndex={roomIndex} />
                                )
                            })}
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    );
}

const Bed = ({ bedIndex, roomIndex, floorIndex }: { bedIndex: number, roomIndex: number, floorIndex: number }) => {
    const [localStorage, setValues] = useLocalStorage<{
        name: string;
        floors: {
            id: number;
            rooms: {
                id: number;
                beds: {
                    id: string;
                    occupied: boolean;
                    client: {
                        name: string;
                        CIN: string;
                        phone: string;
                        occupationDuration: string;
                        from: Date;
                        to: Date;
                    };
                }[];
            }[];
        }[];
    }>('onboarding', {
        name: '',
        floors: [],
    });
    const client = localStorage.floors[floorIndex].rooms[roomIndex].beds[bedIndex].client;
    const toggleOccupation = () => {
        const newValues = { ...localStorage };
        newValues.floors[floorIndex].rooms[roomIndex].beds[bedIndex].occupied = !newValues.floors[floorIndex].rooms[roomIndex].beds[bedIndex].occupied;
        setValues(newValues);
    }

    return (
        <button onClick={toggleOccupation}>
            <Card key={bedIndex} className={cn('h-full', localStorage.floors[floorIndex].rooms[roomIndex].beds[bedIndex].occupied ? " border-red-400" : "border-4 border-green-400", 'border-2')}>
                <CardContent className="p-4 space-y-4">
                    <CardHeader className="w-full flex flex-row items-center justify-between p-0">
                        <CardTitle className="text-lg">Lit {bedIndex + 1}</CardTitle>
                        <BedInfo bedIndex={bedIndex} roomIndex={roomIndex} floorIndex={floorIndex} />
                    </CardHeader>
                    <CardDescription>{client?.occupationDuration ?? '-'}</CardDescription>
                </CardContent>
            </Card>
        </button>
    )
}

const Room = ({ roomIndex, floorIndex }: { roomIndex: number, floorIndex: number }) => {
    const [localStorage] = useLocalStorage<{
        name: string;
        floors: {
            id: number;
            rooms: {
                id: number;
                beds: {
                    id: string;
                    occupied: boolean;
                }[];
            }[];
        }[];
    }>('onboarding', {
        name: '',
        floors: [],
    });

    const room = localStorage.floors[floorIndex].rooms[roomIndex]
    const occupiedBeds = room.beds.filter(bed => bed.occupied);
    const freeBeds = room.beds.filter(bed => !bed.occupied);

    return (<Accordion type="single" collapsible key={roomIndex}>
        <AccordionItem value={`room-${roomIndex}`}>
            <AccordionTrigger>
                <div className="w-full flex flex-row items-center justify-between pr-2">
                    <span>
                        Chambre {roomIndex + 1}
                    </span>
                    <span className="flex space-x-1">
                        {occupiedBeds.map((bed, index) => (
                            <span
                                key={`occupied-${index}`}
                                className="w-4 h-4 rounded-full bg-red-500"
                            ></span>
                        ))}
                        {freeBeds.map((bed, index) => (
                            <span
                                key={`free-${index}`}
                                className="w-4 h-4 rounded-full bg-green-500"
                            ></span>
                        ))}
                    </span>
                </div>
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-1 md:grid-cols-4 gap-1">
                {localStorage.floors[floorIndex].rooms[roomIndex].beds.map((_, bedIndex) => {
                    return (
                        <Bed key={_.id} bedIndex={bedIndex} roomIndex={roomIndex} floorIndex={floorIndex} />
                    )
                })}
            </AccordionContent>
        </AccordionItem>
    </Accordion>)
}

const BedInfo = ({ bedIndex, roomIndex, floorIndex }: { bedIndex: number, roomIndex: number, floorIndex: number }) => {
    const [open, setOpen] = useState(false);
    const [localStorage, setLocalStorage] = useLocalStorage<{
        name: string;
        floors: {
            id: number;
            rooms: {
                id: number;
                beds: {
                    id: string;
                    occupied: boolean;
                    client: {
                        name: string;
                        CIN: string;
                        phone: string;
                        occupationDuration: string;
                        from: Date;
                        to: Date;
                    };
                }[];
            }[];
        }[];
    }>('onboarding', {
        name: '',
        floors: [],
    });
    const client = localStorage.floors[floorIndex].rooms[roomIndex].beds[bedIndex].client;
    const form = useForm<z.infer<typeof bedInfoSchema>>({
        resolver: async (data, context, options) => {
            console.log("data from Form component", Object.keys(data).length, data, "context", context, "options", options)
            console.log("zod resolver", await zodResolver(bedInfoSchema)(data ?? {}, context, options) ?? {})
            return zodResolver(bedInfoSchema)(data, context, options)
        },
        defaultValues: {
            clientName: client?.name || '',
            clientCIN: client?.CIN || '',
            clientPhone: client?.phone || '',
            bedOccupationDuration: client?.occupationDuration || ''
        }
    });

    function onSubmit(values: z.infer<typeof bedInfoSchema>) {
        const newValues = { ...localStorage };
        newValues.floors[floorIndex].rooms[roomIndex].beds[bedIndex].client = {
            name: values.clientName,
            CIN: values.clientCIN,
            phone: values.clientPhone,
            occupationDuration: values.bedOccupationDuration,
            from: values.from,
            to: values.to,
        };
        setLocalStorage(newValues);
        setOpen(false);
    }

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const handleTimeOccupation = (from: Date, to: Date, prettyDate: string) => {
        form.setValue('from', from);
        form.setValue('to', to);
        form.setValue('bedOccupationDuration', prettyDate);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger onClick={handleClick} className="hover:bg-gray-500 ease-in duration-150 rounded px-1"> <InfoIcon /></DialogTrigger>
            <DialogContent className="w-11/12 sm:max-w-md rounded" onClick={handleClick}>
                <DialogHeader>
                    <DialogTitle>Gérer le lit {bedIndex + 1}</DialogTitle>
                    <DialogDescription>
                        Consulter les information sur la reservation du lit {bedIndex + 1} ici. Clicker sur confirmer pour valider les informations.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="clientName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom du client</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Mohammed Bermime" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="clientCIN"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CIN du client</FormLabel>
                                    <FormControl>
                                        <Input placeholder="BB123456" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="clientPhone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Numéro de telephone du client</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="0606060606" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bedOccupationDuration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date de début et de fin de la réservation</FormLabel>
                                    <FormControl>
                                        <DatePickerWithRange from={client?.from} to={client?.to} onCustomSelect={handleTimeOccupation} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Confirmer</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
const InfoIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>


}

export default Dashboard;