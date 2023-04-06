using System;

namespace MyPortfolioMVC.Models
{
    public class SendMessageModel
    {
        /// <summary>
        /// The name of the sender who send the message
        /// </summary>
        public string Sender { get; set; }

        /// <summary>
        /// The email of the sender to respond
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Message wrote by the sender
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// The date in which the sender is sending the message
        /// </summary>
        public DateTime DateSend { get; set; }
    }
}
