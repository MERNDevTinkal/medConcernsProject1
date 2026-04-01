import { Link, useLocation } from "react-router-dom";
import { Checked, Close, Question, WomenIcon } from "../../Component/DiseasesData/images"
const DecisionCardSed = () => {
  const location = useLocation();
  return (
    <>
      <div className="w-full overflow-hidden decision-cards">

        <Link to="/emotions">
          <div className="flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-3 cursor-pointer hover:border-blue-600 transition-colors duration-300">
            <div className="flex items-center">
              <p className="text-[32px] font-medium text-green-600">YES</p>
            </div>
            <div>
              <img src={Checked} alt="" />
            </div>
          </div>
        </Link>

        <Link to="">
          <div className="flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-3 cursor-pointer hover:border-blue-600 transition-colors duration-300">
            <div className="flex items-center">
              <p className="text-[32px] font-medium text-red-600">NO</p>
            </div>
            <div>
              <img src={Close} />
            </div>
          </div>
        </Link>
        {!["/concern-pain", "/face-pain"].includes(location.pathname) && (
          <div className="flex items-center justify-between p-4 border-3 border-white bg-white rounded-[10px] mb-3 cursor-pointer hover:border-blue-600 transition-colors duration-300">
            <div className="flex items-center">
              <img src={WomenIcon} alt="" className="w-15 h-15" draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()} />
            </div>
            <div>
              <img src={Question}   draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}/>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DecisionCardSed;
