import { useAsapContext } from '../services/state/AsapContextProvider';

const TestRoute1 = () => {
    const { asapUser } = useAsapContext();
    console.log(asapUser);
    return <div>TestRoute1</div>;
};

export default TestRoute1;
