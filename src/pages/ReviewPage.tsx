import { IonBackButton, IonButton, IonButtons, IonContent, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';

//theme
import { FaStar } from 'react-icons/fa'
import { useParams } from 'react-router';
import './ReviewPage.css'


const ReviewPage: React.FC = () => {
    const [rating, setRating] = useState<number>(0);
    const uriData = useParams<any>();

    // submit review
    const handleSubmitReview = () => {
        console.log(rating);
    }

    return (
        <IonPage>
            <IonToolbar className="ion-margin-top">
                <IonTitle className="titleMiddle" style={{ fontWeight: "500", fontSize: "16px" }}>Review</IonTitle>
                <IonButtons slot="start">
                    <IonBackButton defaultHref={`/OrderDetail/Freelancer/${uriData.id}`} />
                </IonButtons>
            </IonToolbar>
            <IonContent fullscreen>

                <div className="summary-box ion-margin">
                    <div className="ion-text-center">
                        <div>
                            <p>What is your review?</p>
                        </div>
                        {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;

                            return (
                                <label key={i}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => setRating(ratingValue)}
                                    />
                                    <FaStar className="star" color={ratingValue <= rating ? "ffc107" : "7f7f7f"} size={20} />
                                </label>
                            );
                        })}
                    </div>
                    <div className="ion-margin-top">
                        <div>
                            <IonTextarea placeholder="Write your experience with this freelancer....." className="form-input" rows={6} style={{ color: "gray" }}></IonTextarea>
                        </div>
                        <IonButton className="summary-button ion-margin-top" onClick={() => handleSubmitReview()}>Review</IonButton>
                    </div>
                </div>

            </IonContent>
        </IonPage>
    );
};

export default ReviewPage;
