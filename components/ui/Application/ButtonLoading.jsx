import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function ButtonLoading() {
    return (
        <Button
            size="sm" variant="outline" disabled
            type="submit"
            className="w-full mt-2 py-3 rounded-xl font-semibold text-lg md:text-xl bg-linear-to-tr from-pink-700 to-purple-700 shadow-lg hover:scale-[1.04] transition-transform cursor-pointer"
        >
            <Spinner />
            Login to Shop
        </Button>
    )
}
