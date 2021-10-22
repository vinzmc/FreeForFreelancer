import { IonContent, IonLabel, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import firebase from '../firebase';
import Freelancer from "../components/Freelancer";
import './SearchPage.css'
import { dice } from "ionicons/icons";
import { useLocation, useParams } from "react-router";

const CategoryPage: React.FC = (props) => {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState<any>([]);
    const [renderedData, setRenderedData] = useState<any>([]);
    const uriData = useParams<any>();

    useEffect(() => {
        firebase
            .firestore()
            .collection('freelancer')
            .where('kategori', '==', uriData.id)
            .onSnapshot((snapshot) => {
                var newData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                //temporary solution untuk auth
                newData = newData.filter((value: any) => {
                    if (value.name !== 'Sergio Nathaniel') {
                        return value;
                    }
                })

                setData(newData);
                setRenderedData(newData);
                setSearchText('');
            })
    }, [])

    function cardOnClick(id: string) {
        window.location.href = "/Freelancer/".concat(id);
    }

    return (
        <IonPage>
            <IonContent>
                <IonToolbar className="ion-margin-top" style={{ marginBottom: '1rem' }}>
                    <IonTitle className="titleMiddle">{uriData.id}</IonTitle>
                </IonToolbar>
                <IonLabel className="label">{renderedData.length} Freelancers Found</IonLabel>
                <IonList>
                    {renderedData.map((doc: any) =>
                        <div key={doc.id} onClick={() => cardOnClick(doc.id)}>
                            <Freelancer key={doc.id} name={doc.name} job={doc.job} star={doc.star} review={doc.review} price={doc.price + 'M'} pic={doc.pic} />
                        </div>
                    )
                    }
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default CategoryPage;