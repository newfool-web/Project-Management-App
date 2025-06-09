import logo from "@/assets/logo.jpg";
import { Link } from "react-router-dom";

const Logo = (props: { url?: string }) => {
  const { url = "/" } = props;
  return (
    <div className="flex items-center justify-center sm:justify-start">
      <Link to={url}>
        <div className="flex h-8 w-8 items-center justify-center rounded-md text-primary-foreground">
          <img src={logo} alt="Logo" className="h-full w-full object-contain" />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
