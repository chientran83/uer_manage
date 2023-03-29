export interface ButtonType {
    type : "link" | "text" | "ghost" | "default" | "primary" | "dashed" | undefined,
    to?: string,
    children : any,
    shape : any,
    onClick?: any,
    danger?: boolean
}