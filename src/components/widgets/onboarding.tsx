'use client'

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { number, z } from "zod"
import { useForm, useFormContext } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { useLocalStorage } from "usehooks-ts"
import { ArrowRightIcon, Loader } from "lucide-react"



const steps = ['NAME', 'NUM_FLOORS', 'ROOMS_PER_FLOOR', 'BEDS_PER_ROOM', 'DONE'] as const
export const onboardingSchema = z.object({
    step: z.enum(steps),
    name: z.string(),
    numFloors: z.coerce.number(),
    roomsPerFloor: z.record(
        z.string().regex(/^floor_\d+$/),
        z.coerce.number()
    ),
    bedsPerRoom: z.record(z.string().regex(/^floor_\d+_room_\d+$/),
        z.coerce.number())
})

const Onboarding = () => {
    const [, setLocalStorage] = useLocalStorage('onboarding', {})
    const router = useRouter()
    const form = useForm<z.infer<typeof onboardingSchema>>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            step: 'NAME',
            name: '',
            numFloors: 0,
            roomsPerFloor: {},
            bedsPerRoom: {}
        },
    })

    const goToNextStep = () => {
        const currentStepIndex = steps.indexOf(form.getValues('step'))
        if (currentStepIndex === steps.length - 1) {
            return
        }
        form.setValue('step', steps[currentStepIndex + 1])
    }
    function onSubmit(values: z.infer<typeof onboardingSchema>) {
        console.log('====================================');
        console.log(values);
        console.log('====================================');
        if (values.step !== 'DONE') {
            return
        }
        const formattedValues = {
            name: values.name,
            floors: Array.from({ length: values.numFloors }).map((_, index) => {
                const floorKey = `floor_${index + 1}`;
                return {
                    id: index + 1,
                    rooms: Array.from({ length: values.roomsPerFloor[floorKey] }).map((_, roomIndex) => {
                        const roomKey = `floor_${index + 1}_room_${roomIndex + 1}`;
                        return {
                            id: roomIndex + 1,
                            beds: Array.from({ length: values.bedsPerRoom[roomKey] }).map((_, bedIndex) => {
                                return {
                                    id: `${index + 1}_${roomIndex + 1}_${bedIndex + 1}`,
                                    occupied: false
                                }
                            })
                        }
                    })
                }
            })
        }
        setLocalStorage(formattedValues)
        return router.push('/dashboard')
    }

    if (form.getValues('step') === 'DONE') {
        return <Loader className="w-10 h-10 animate-spin" />
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-fit w-full space-y-8 lg:px-10 relative z-10 flex flex-col items-center justify-center">
                <div className="flex w-full items-center justify-center  space-x-2">
                    {form.getValues('step') === 'NAME' && <Step0 />}
                    {form.getValues('step') === 'NUM_FLOORS' && <Step1 />}
                    {form.getValues('step') === 'ROOMS_PER_FLOOR' && <Step2 />}
                    {form.getValues('step') === 'BEDS_PER_ROOM' && <Step3 />}
                </div>
                <Button type="submit" onClick={goToNextStep} className=""><span className="pr-1">Suivant</span> {' '}<ArrowRightIcon className="shrink-0 w-5 h-5" /></Button>
            </form>
        </Form>
    )
}

const Step0 = () => {
    const form = useFormContext<z.infer<typeof onboardingSchema>>()

    return (<FormField
        control={form.control}
        name="name"
        render={({ field }) => (
            <FormItem className="w-full max-w-sm">
                <FormLabel>Nom de l{"'"}hostel</FormLabel>
                <FormControl>
                    <Input placeholder="Hilton" {...field} />
                </FormControl>

                <FormMessage />
            </FormItem>
        )}
    />)
}

const Step1 = () => {
    const form = useFormContext<z.infer<typeof onboardingSchema>>()
    return (
        <FormField
            control={form.control}
            name="numFloors"
            render={({ field }) => (
                <FormItem className="w-full max-w-sm">
                    <FormLabel>Nombre {"'"}étages</FormLabel>
                    <FormControl>
                        <Input type="number" min={0} {...field} />
                    </FormControl>

                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

const Step2 = () => {
    const form = useFormContext<z.infer<typeof onboardingSchema>>()
    const numberOfFloors = form.getValues('numFloors')

    return (<div className="w-full flex flex-col gap-8 max-w-sm">
        {Array.from({ length: numberOfFloors }).map((_, index) => (
            <FormField
                key={index}
                control={form.control}
                name={'roomsPerFloor.floor_' + (index + 1).toString() as `roomsPerFloor.${string}`}
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Nombre de chambres à l{"'"}étage {index + 1}</FormLabel>
                        <FormControl>
                            <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        )

        )}
    </div>)
}

const Step3 = () => {
    const form = useFormContext<z.infer<typeof onboardingSchema>>()
    const numberOfFloors = form.getValues('numFloors')
    const roomsPerFloor = form.getValues('roomsPerFloor')

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-3xl">
            {Array.from({ length: numberOfFloors }).map((_, index) => {
                const floorKey = `floor_${index + 1}`;
                return (
                    <div key={index} className="w-full">
                        <h3 className="text-lg font-bold">Étage {index + 1}</h3>
                        {Array.from({ length: roomsPerFloor[floorKey] }).map((_, roomIndex) => (
                            <FormField
                                key={roomIndex}
                                control={form.control}
                                name={'bedsPerRoom.floor_' + (index + 1).toString() + '_room_' + (roomIndex + 1).toString() as `bedsPerRoom.${string}`}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Lits dans la chambre {roomIndex + 1}</FormLabel>
                                        <FormControl>
                                            <Input type="number" min={0} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    )
}

export default Onboarding