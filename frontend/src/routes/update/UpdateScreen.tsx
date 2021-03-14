import './update-screen.scss';
import { UpdateRestaurant } from 'src/components';

const UpdateScreen = (): React.ReactElement => {
  return (
    <div className="update-screen">
      <header>Update Restaurant</header>
      <UpdateRestaurant />
    </div>
  );
};

export default UpdateScreen;
