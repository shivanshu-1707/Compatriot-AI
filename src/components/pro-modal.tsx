"use client"

import { useProModal } from "@/hooks/use-pro-model";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import axios from "axios";
export const ProModal = () => {
    const proModal = useProModal();
    const {toast} = useToast();

    const [loading,setLoading] = useState(false); 
    const onSubscribe =async () =>{
        try{
            setLoading(true);
            const response = await axios.get("api/stripe")

            window.location.href = response.data.url;
        }
        catch{
            toast(
                {
                 variant:"destructive",
                 description: "Something went wrong",   
                }
            )
        }
        finally{
            setLoading(false); 
        }
    }
    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader className="space-y-4">
                    <DialogTitle className="text-center">
                        Upgrade to Pro
                    </DialogTitle>
                    <DialogDescription className="text-center space-y-2">
                        Create<span className="text-sky-500 mx-1 font-medium">Custom AI</span>Companions!
                    </DialogDescription>
                </DialogHeader>
                <Separator/>
                <div className="flex justify-between">
                    <p className="text-2xl font-medium">
                        $9
                        <span className="text-sm font-normal">
                            .99 / mo
                        </span>
                    </p>
                    <Button disabled={loading} onClick={onSubscribe} variant="premium">
                        Subscribe
                    </Button>
                </div>
            </DialogContent>

        </Dialog>
    )
}