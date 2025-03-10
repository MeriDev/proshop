import { Alert } from 'react-bootstrap';

type alertType = {
  variant: string;
  children: React.ReactNode;
};

const Message = ({ variant, children }: alertType) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
