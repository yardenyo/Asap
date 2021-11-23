import { useAsapContext } from '../services/state/AsapContextProvider';

const TestRoute1 = () => {
    const { userState } = useAsapContext();
    console.log(userState);
    return <div>TestRoute1</div>;
};

export default TestRoute1;
