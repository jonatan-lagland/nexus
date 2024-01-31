import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import * as React from 'react';

export function AlertDialogRateLimit() {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Rate Limit Exceeded</AlertDialogTitle>
                    <AlertDialogDescription>
                        We apologize, but our service has temporarily hit a rate limit with our data provider.
                        This usually occurs when there&apos;s a high volume of requests. To ensure fair usage, we&apos;re required to limit the frequency of data access.
                        The page will automatically refresh in about a minute to try and restore access.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>Dismiss</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
