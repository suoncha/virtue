using UnityEngine;
using DG.Tweening; // Import the DOTween namespace

public class TotemGadget : MonoBehaviour
{
    public float scaleFactor = 1.2f;
    public float duration = 0.5f;
    public Ease pulsateEaseType = Ease.InOutSine;
    public int loops = -1; // -1 means infinite loops

    public Vector3 rotationAngles = new Vector3(0, 360, 0);
    public float rotationDuration = 1f;
    public Ease rotationEaseType = Ease.OutBounce;
    public float initialDelay = 2f;
    public float delayBetweenRotations = 2f;

    public float hideDuration = 0.5f;
    public float showDuration = 0.5f;
    public Ease hideEaseType = Ease.OutQuad;
    public Ease showEaseType = Ease.OutQuad;

    public Renderer meshRenderer;

    public bool On = true;

    private void Start()
    {
        // Start the pulsate animation
        Pulsate();
    }

    private void Pulsate()
    {
        // Save the initial scale
        Vector3 initialScale = transform.localScale;

        // Calculate the target scale
        Vector3 targetScale = initialScale * scaleFactor;

        // Create the pulsate animation using a sequence
        Sequence sequence = DOTween.Sequence();
        sequence.Append(transform.DOScale(targetScale, duration).SetEase(pulsateEaseType));
        sequence.Append(transform.DOScale(initialScale, duration).SetEase(pulsateEaseType));
        sequence.SetLoops(loops);

        // Start the animation
        sequence.Play();
    }
}