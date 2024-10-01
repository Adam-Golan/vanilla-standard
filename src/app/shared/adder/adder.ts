// import { NewExercise } from "@app/shared/newExercise/newExercise";
import { ComponentBase, ComponentDecorator } from "@decorators";
import { State } from "@services";
import { StateKeys } from "@services/state/config";

import './adder.scss';

@ComponentDecorator
export class Adder extends ComponentBase<{}> {
    constructor(protected appState: State) {
        super();

    }
    protected init(): void {
        this.id = 'adder';
        // this.onclick = () => this.appState.publish(StateKeys.openModal, new NewExercise());
    }
}