import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncActionError, asyncActionFinish, asyncActionStart } from "../async/asyncReducer";
import { dataFromSnapshot } from "../firestore/firestoreService";

//custom hook
//1.passing the parameters inside an object just to have named parameters
//2. shouldExecute is a parameter that forces the hook to an early return to avoid errors when creating a new event
export default function useFirestoreDoc({query, data, deps, shouldExecute = true}) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!shouldExecute) return;
        dispatch(asyncActionStart());
        const unsubscribe = query().onSnapshot(
            snapshot => { if (!snapshot.exists) {  // FirestoreError way to deal with id not found
                dispatch(asyncActionError({code: "not-found", message: "Could not find document"}));
                return;
            };
                data(dataFromSnapshot(snapshot));
                dispatch(asyncActionFinish());
            },
            error => dispatch(asyncActionError())
        );
        return () => {
            unsubscribe()
        }
    }, deps) //eslint-disable-line react-hooks/exhaustive-deps
}