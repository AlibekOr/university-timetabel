import Placeholder from 'react-bootstrap/Placeholder';
import "./skleton.scss"
const SkeletonLoading = () => {
    return (
        <div className="skeleton-items">
            {Array(5)
                .fill()
                .map((_, index) => {
                    return (
                        <Placeholder key={index} animation="glow">
                            <Placeholder className="skeleton-s" xs={12} />
                        </Placeholder>
                    );
                })}
        </div>
    );
};

export default SkeletonLoading;
