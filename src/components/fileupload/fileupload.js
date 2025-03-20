import { Button, Card, Stack, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useState } from "react";
import { getImageURL } from "../../controllers/user";

const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            const canvas = document.createElement("canvas");
            let width = img.width;
            let height = img.height;

            // Maintain aspect ratio
            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => {
                resolve(blob);
            }, file.type);
        };
        img.onerror = (err) => reject(err);
    });
};

export function FileUpload({ doSetFile, existing }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (existing) {
            setImage(getImageURL(existing));
        }
    }, [existing]);

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const resizedBlob = await resizeImage(selectedFile, 512, 512);
            const resizedFile = new File([resizedBlob], selectedFile.name, { type: selectedFile.type });
            setFile(resizedFile);
            doSetFile(resizedFile);
            const imageUrl = URL.createObjectURL(resizedFile);
            setImage(imageUrl);
        }
    };

    return (
        <Card sx={{ height: '100%', width: '100%', flexGrow: 1 }}>
            <Stack direction="row" spacing={2}>

                <Button
                    variant=""
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    sx={{ flexGrow: 1, height: '100%', minHeight: 128, justifyContent: 'center', alignItems: 'center' }}
                >
                    {image && <img src={image} width={128} />}
                    {!image && <Typography>Select File</Typography>}
                    <input type="file" hidden onChange={handleFileChange} />
                </Button>
            </Stack>
        </Card>

    )
}