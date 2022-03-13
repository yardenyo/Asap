import { Modal } from 'antd';
import 'antd/dist/antd.css';

const ModalBox = () => {
        Modal.error({
            title: 'לא הצלחנו לאתר אתכם',
            content: 'אנא וודאו כי שם המשתמש ו/או הסיסמא נכונים',
        });
}

export default ModalBox;