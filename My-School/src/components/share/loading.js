import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../../style/share.css";

export default function Loading() {
  const showLoader = useSelector(state => state.loader);

  return showLoader ? (
    <div className="loader-backdrop">
      <CircularProgress disableShrink />
    </div>
  ) : (
    ""
  );
}
