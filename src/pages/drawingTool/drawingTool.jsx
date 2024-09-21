import { Tool } from '../../components/Tool';
import './index.scss';

const iconList = ['square', 'diamond', 'circle', 'arrow', 'line']

const DrawingTool = () => {
  return (
    <div className='drawing-tool'>
      <div className="tools">
        <Tool iconList={iconList} />
      </div>
      <div className="canvas"></div>
    </div>
  )
}

export default DrawingTool;