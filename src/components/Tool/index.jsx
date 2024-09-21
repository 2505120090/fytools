import './index.scss';

const genaretIcon = (type) => {
  switch (type) {
    case "square":
      return (
        <svg width="24" height="24">
          <rect x="2" y="2" width="20" height="20" stroke="black" fill="none" />
        </svg>
      );
    case "diamond":
      return (
        <svg width="24" height="24">
          <polygon points="12,2 22,12 12,22 2,12" stroke="black" fill="none" />
        </svg>
      );
    case "circle":
      return (
        <svg width="24" height="24">
          <circle cx="12" cy="12" r="10" stroke="black" fill="none" />
        </svg>
      );
    case "arrow":
      return (
        <svg width="24" height="24">
          <line x1="2" y1="12" x2="22" y2="12" stroke="black" />
          <polyline points="18,8 22,12 18,16" stroke="black" fill="none" />
        </svg>
      );
    case "line":
      return (
        <svg width="24" height="24">
          <line x1="2" y1="12" x2="22" y2="12" stroke="black" />
        </svg>
      );
    default:
      return null;
  }
};

export const Tool = ({ iconList }) => {
  return (
    <div className='tool'>
      {
        iconList?.map(item => (
          <div className='tool-item'>{genaretIcon(item)}</div>
        ))
      }
    </div>
  )
}