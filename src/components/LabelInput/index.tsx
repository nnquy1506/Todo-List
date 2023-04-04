import React from 'react'
import { Box } from "@mui/material";
interface LabelInputModelProps {
    title: string
}
const LabelInput = (props: LabelInputModelProps) => {
    const { title } = props
    return <Box fontWeight="bold" mb={1}>{title}</Box>
}
export default LabelInput