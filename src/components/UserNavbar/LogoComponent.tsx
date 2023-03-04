import { Image, NavbarBrand } from "react-bootstrap"

export const LogoComponent = () => {
    return (
        <NavbarBrand href="/" className="d-flex gap-2 align-items-center">
            <Image className="position-relative illustration" src="/assets/images/newsfeed-logo.svg" width="30px" height="30px"></Image>
            <h1 className="fs-3 m-0">NewsFeed<span className="text-primary">.</span></h1>
        </NavbarBrand>
    )
}