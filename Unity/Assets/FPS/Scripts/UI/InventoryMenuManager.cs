using Unity.FPS.Game;
using Unity.FPS.Gameplay;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace Unity.FPS.UI
{
    public class InventoryMenuManager : MonoBehaviour
    {
        [Tooltip("Root GameObject of the menu used to toggle its activation")]
        public GameObject MenuRoot;

        [Tooltip("Master volume when menu is open")]
        [Range(0.001f, 1f)]
        public float VolumeWhenMenuOpen = 0.5f;

        [Tooltip("Toggle component for crypto")]
        public Toggle Totem1Toggle;
        public Toggle Totem2Toggle;
        public Toggle Totem3Toggle;

        [Tooltip("GameObject for the controls")]
        public GameObject ControlImage;

        [SerializeField] private TotemGadget m_TotemGadget1;
        [SerializeField] private TotemGadget m_TotemGadget2;
        [SerializeField] private TotemGadget m_TotemGadget3;

        void Start()
        {
            DebugUtility.HandleErrorIfNullFindObject<TotemGadget, InventoryMenuManager>(
                m_TotemGadget1,
                this
            );

            MenuRoot.SetActive(false);

            Totem1Toggle.isOn = m_TotemGadget1.transform.gameObject.activeSelf;
            Totem1Toggle.onValueChanged.AddListener(OnCrypto1Changed);

            Totem2Toggle.isOn = m_TotemGadget2.transform.gameObject.activeSelf;
            Totem2Toggle.onValueChanged.AddListener(OnCrypto2Changed);

            Totem3Toggle.isOn = m_TotemGadget3.transform.gameObject.activeSelf;
            Totem3Toggle.onValueChanged.AddListener(OnCrypto3Changed);
        }

        void Update()
        {
            // Lock cursor when clicking outside of menu
            if (!MenuRoot.activeSelf && Input.GetMouseButtonDown(0))
            {
                Cursor.lockState = CursorLockMode.Locked;
                Cursor.visible = false;
            }

            if (Input.GetKeyDown(KeyCode.Escape))
            {
                Cursor.lockState = CursorLockMode.None;
                Cursor.visible = true;
            }

            if (
                Input.GetButtonDown(GameConstants.k_ButtonNameInventory)
                || (MenuRoot.activeSelf && Input.GetButtonDown(GameConstants.k_ButtonNameCancel))
            )
            {
                if (ControlImage.activeSelf)
                {
                    ControlImage.SetActive(false);
                    return;
                }

                SetPauseMenuActivation(!MenuRoot.activeSelf);
            }
        }

        public void ClosePauseMenu()
        {
            SetPauseMenuActivation(false);
        }

        void SetPauseMenuActivation(bool active)
        {
            MenuRoot.SetActive(active);

            if (MenuRoot.activeSelf)
            {
                Cursor.lockState = CursorLockMode.None;
                Cursor.visible = true;
                Time.timeScale = 0f;
                AudioUtility.SetMasterVolume(VolumeWhenMenuOpen);

                EventSystem.current.SetSelectedGameObject(null);
            }
            else
            {
                Cursor.lockState = CursorLockMode.Locked;
                Cursor.visible = false;
                Time.timeScale = 1f;
                AudioUtility.SetMasterVolume(1);
            }
        }

        void OnCrypto1Changed(bool newValue)
        {
            m_TotemGadget1.transform.gameObject.SetActive(newValue);
        }

        void OnCrypto2Changed(bool newValue)
        {
            m_TotemGadget2.transform.gameObject.SetActive(newValue);
        }

        void OnCrypto3Changed(bool newValue)
        {
            m_TotemGadget3.transform.gameObject.SetActive(newValue);
        }
    }
}
